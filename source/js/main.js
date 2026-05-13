(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  var accent = window.__THEME_ACCENT__;
  if (accent) {
    document.documentElement.style.setProperty("--accent", accent);
  }

  function attachCursorGlow() {
    var glow = document.querySelector(".cursor-glow");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var noHover = window.matchMedia && window.matchMedia("(hover: none)").matches;
    if (!glow || reducedMotion || noHover) return;

    var rafId = 0;
    var cursorX = 0;
    var cursorY = 0;
    var active = false;

    function renderGlow() {
      rafId = 0;
      glow.style.setProperty("--cursor-x", cursorX + "px");
      glow.style.setProperty("--cursor-y", cursorY + "px");
    }

    window.addEventListener("pointermove", function (event) {
      if (event.pointerType && event.pointerType !== "mouse") return;

      cursorX = event.clientX;
      cursorY = event.clientY;

      if (!active) {
        glow.classList.add("is-visible");
        active = true;
      }

      if (!rafId) {
        rafId = window.requestAnimationFrame(renderGlow);
      }
    }, { passive: true });

    window.addEventListener("pointerleave", function () {
      glow.classList.remove("is-visible");
      active = false;
    });

    window.addEventListener("blur", function () {
      glow.classList.remove("is-visible");
      active = false;
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        resolve();
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  attachCursorGlow();
  function attachCopyButtons() {
    var blocks = Array.prototype.slice.call(
      document.querySelectorAll(".article-body figure.highlight")
    );
    var plainBlocks = Array.prototype.slice.call(
      document.querySelectorAll(".article-body pre")
    ).filter(function (block) {
      return !block.closest("figure.highlight");
    });

    blocks = blocks.concat(plainBlocks);

    blocks.forEach(function (block) {
      if (block.dataset.copyReady === "1") return;

      var wrapper = block.closest(".code-block") || block.parentElement;
      if (!wrapper || !wrapper.classList.contains("code-block")) {
        var container = document.createElement("div");
        container.className = "code-block";
        block.parentNode.insertBefore(container, block);
        container.appendChild(block);
        wrapper = container;
      }

      var button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-btn";
      button.textContent = "复制";

      button.addEventListener("click", function () {
        var text = "";

        if (block.matches("figure.highlight")) {
          var codeCell = block.querySelector("td.code");
          text = codeCell ? codeCell.innerText : block.innerText;
        } else {
          text = block.innerText;
        }

        copyText(text).then(function () {
          button.textContent = "已复制";
          window.setTimeout(function () {
            button.textContent = "复制";
          }, 1600);
        }).catch(function () {
          button.textContent = "失败";
          window.setTimeout(function () {
            button.textContent = "复制";
          }, 1600);
        });
      });

      wrapper.appendChild(button);
      block.dataset.copyReady = "1";
    });
  }

  function findTargetFromHref(href) {
    if (!href || href.charAt(0) !== "#") return null;

    var raw = href.slice(1);
    var candidates = [raw];

    try {
      var decoded = decodeURIComponent(raw);
      if (decoded && candidates.indexOf(decoded) === -1) {
        candidates.push(decoded);
      }
    } catch (error) {
    }

    for (var i = 0; i < candidates.length; i += 1) {
      var byId = document.getElementById(candidates[i]);
      if (byId) return byId;
    }

    var headerlinks = Array.prototype.slice.call(
      document.querySelectorAll(".article-body .headerlink")
    );

    for (var j = 0; j < headerlinks.length; j += 1) {
      var link = headerlinks[j];
      var anchorHref = link.getAttribute("href");
      if (anchorHref === href || candidates.indexOf((anchorHref || "").slice(1)) !== -1) {
        return link.parentElement;
      }
    }

    return null;
  }

  function attachTocNavigation() {
    var tocLinks = Array.prototype.slice.call(
      document.querySelectorAll(".article-toc-list a")
    );

    if (!tocLinks.length) return;

    var topbar = document.querySelector(".topbar");
    var offset = topbar ? topbar.offsetHeight + 20 : 96;

    var tocItems = tocLinks.map(function (link) {
      return {
        link: link,
        target: findTargetFromHref(link.getAttribute("href"))
      };
    }).filter(function (item) {
      return !!item.target;
    });

    function getTopLevelItem(link) {
      var current = link.closest(".article-toc-list-item");
      var topLevel = current;

      while (topLevel) {
        var parentItem = topLevel.parentElement.closest(".article-toc-list-item");
        if (!parentItem) {
          break;
        }
        topLevel = parentItem;
      }

      return topLevel;
    }

    function updateExpandedState(link) {
      var tocListItems = Array.prototype.slice.call(
        document.querySelectorAll(".article-toc-list-item")
      );

      tocListItems.forEach(function (item) {
        item.classList.remove("is-expanded");
      });

      if (!link) return;

      var current = link.closest(".article-toc-list-item");
      while (current) {
        current.classList.add("is-expanded");
        current = current.parentElement.closest(".article-toc-list-item");
      }

      var topLevelItem = getTopLevelItem(link);
      if (topLevelItem) {
        topLevelItem.classList.add("is-expanded");
      }
    }

    function setActive(link) {
      tocLinks.forEach(function (item) {
        item.classList.remove("is-active");
      });

      if (link) {
        link.classList.add("is-active");
        updateExpandedState(link);
      }
    }

    tocItems.forEach(function (item) {
      item.link.addEventListener("click", function (event) {
        var target = item.target;
        if (!target) return;

        event.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: Math.max(top, 0),
          behavior: "smooth"
        });
        history.replaceState(null, "", item.link.getAttribute("href"));
        setActive(item.link);
      });
    });

    function syncActiveByScroll() {
      if (!tocItems.length) return;

      var current = tocItems[0];
      var marker = window.pageYOffset + offset + 12;

      tocItems.forEach(function (item) {
        if (item.target.offsetTop <= marker) {
          current = item;
        }
      });

      if (current) {
        setActive(current.link);
      }
    }

    window.addEventListener("scroll", syncActiveByScroll, { passive: true });

    if (window.location.hash) {
      var initialItem = tocItems.find(function (item) {
        return item.link.getAttribute("href") === window.location.hash;
      });
      if (initialItem) {
        setActive(initialItem.link);
      } else {
        syncActiveByScroll();
      }
    } else {
      syncActiveByScroll();
    }
  }

  function attachMathRendering() {
    var mathOptions = window.__THEME_MATH__;
    if (!mathOptions || !mathOptions.enable) return;
    if (typeof window.renderMathInElement !== "function") return;

    var delimiters = [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ];

    if (mathOptions.inlineDollar) {
      delimiters.push({ left: "$", right: "$", display: false });
    }

    var blocks = Array.prototype.slice.call(
      document.querySelectorAll(".article-body")
    );

    blocks.forEach(function (block) {
      if (block.dataset.mathReady === "1") return;

      window.renderMathInElement(block, {
        delimiters: delimiters,
        throwOnError: false,
        strict: "ignore",
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
        ignoredClasses: ["highlight", "gutter", "code"]
      });

      block.dataset.mathReady = "1";
    });
  }

  attachCopyButtons();
  attachTocNavigation();
  attachMathRendering();
})();
