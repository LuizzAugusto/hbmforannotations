// @ts-check
/**
 * 
 * @param {import("./types.d.ts").HbmOneToOneType} obj
 * @param {{ spaces?: string }} options
 * @returns {string}
 */
export function genOneToOne(obj, { spaces = "    " } = {}) {
  const elements = obj.attributes.elements || []
  const lastIndexOfDot = obj.attributes.class.lastIndexOf(".")
  const className = obj.attributes.class.slice(lastIndexOfDot + 1)
  let text = ""

  text += `${spaces}\n@OneToOne(fetch = FetchType.Lazy)`

  for (const element of elements)
    if (element.name === "column")
      text += `${spaces}\n@JoinColumn(name = ${element.attributes.name}, insertable = false, updatable = false)`

  text += `${spaces}\nvar ${obj.attributes.name.replace("Hibernate", "")}: ${className}? = null`
  
  return text
}