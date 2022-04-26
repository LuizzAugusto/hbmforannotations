/**
 * 
 * @param {string} className 
 * @param {string} text 
 */
export function writeFile(className, text) {
  Deno.writeTextFile(`${className}.kt`, text, { create: true })
}