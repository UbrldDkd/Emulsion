/**
 * Toggle an item in a Set
 * @param {Set} set - The set to toggle the item in
 * @param {any} item - The item to toggle
 * @returns {Set} New set with the item toggled
 */
export const toggleSetItem = (set, item) => {
  const newSet = new Set(set);
  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }
  return newSet;
};

/**
 * Add an item to a Set
 * @param {Set} set - The set to add the item to
 * @param {any} item - The item to add
 * @returns {Set} New set with the item added
 */
export const addToSet = (set, item) => {
  const newSet = new Set(set);
  newSet.add(item);
  return newSet;
};

/**
 * Remove an item from a Set
 * @param {Set} set - The set to remove the item from
 * @param {any} item - The item to remove
 * @returns {Set} New set with the item removed
 */
export const removeFromSet = (set, item) => {
  const newSet = new Set(set);
  newSet.delete(item);
  return newSet;
};

/**
 * Remove multiple items from a Set
 * @param {Set} set - The set to remove items from
 * @param {Array} items - The items to remove
 * @returns {Set} New set with the items removed
 */
export const removeMultipleFromSet = (set, items) => {
  const newSet = new Set(set);
  items.forEach(item => newSet.delete(item));
  return newSet;
};

/**
 * Create a toggle function for a specific setState and key
 * @param {Function} setState - The setState function
 * @param {any} key - The key to toggle
 * @returns {Function} Toggle function
 */
export const createToggleFunction = (setState, key) => () => {
  setState(prev => toggleSetItem(prev, key));
};