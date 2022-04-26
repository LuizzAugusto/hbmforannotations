// @ts-check
/**
 * 
 * @param {import("./types.d.ts").HbmManyToOneType|import("./types.d.ts").HbmKeyManyToOneType} obj
 * @param {{ spaces?: string }} options
 * @returns {string}
 */
export function genManyToOne(obj, { spaces = "    " } = {}) {
  const elements = obj.attributes.elements || []
  const lastIndexOfDot = obj.attributes.class.lastIndexOf(".")
  const className = obj.attributes.class.slice(lastIndexOfDot + 1)
  let text = ""

  text += `\n${spaces}@ManyToOne(fetch = FetchType.Lazy, cascade = [ CascadeType.ALL ])`

  for (const element of elements)
    if (element.name === "column")
      text += `\n${spaces}@JoinColumn(name = ${element.attributes.name}, insertable = false, updatable = false)`

  text += `\n${spaces}var ${obj.attributes.name.replace("Hibernate", "")}: ${className}? = null`
  
  return text
}