"use strict";

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map(cloneValue);
  }

  if (isPlainObject(value)) {
    var result = {};
    Object.keys(value).forEach(function (key) {
      result[key] = cloneValue(value[key]);
    });
    return result;
  }

  return value;
}

function mergeValue(baseValue, overrideValue) {
  if (typeof overrideValue === "undefined") {
    return cloneValue(baseValue);
  }

  if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
    var result = cloneValue(baseValue);
    Object.keys(overrideValue).forEach(function (key) {
      result[key] = mergeValue(result[key], overrideValue[key]);
    });
    return result;
  }

  return cloneValue(overrideValue);
}

function getRootThemeContainers(config) {
  if (!config || typeof config !== "object") {
    return [];
  }

  return [
    config["7h3_w4y_70_b4ld"],
    config.the_way_to_bald
  ].filter(function (item) {
    return item && typeof item === "object";
  });
}

hexo.extend.helper.register("theme_config", function (section, fallbackValue) {
  var config = this.config || {};
  var theme = this.theme || {};
  var value = theme ? theme[section] : undefined;

  getRootThemeContainers(config).forEach(function (container) {
    if (Object.prototype.hasOwnProperty.call(container, section)) {
      value = mergeValue(value, container[section]);
    }
  });

  if (Object.prototype.hasOwnProperty.call(config, section)) {
    value = mergeValue(value, config[section]);
  }

  if (typeof value === "undefined") {
    return cloneValue(fallbackValue);
  }

  return value;
});
