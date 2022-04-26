// @ts-check
/**
 * 
 * @param {import("./types.d.ts").HbmManyToOneType|import("./types.d.ts").HbmKeyManyToOneType|import("./types.d.ts").HbmOneToOneType} obj
 * @param {import("./types.d.ts").OptionsTypes} options
 * @returns {string}
 */
export function genManyToOne(obj, { spaces = "    " } = {}) {
  const lastIndexOfDot = obj.attributes.class.lastIndexOf(".")
  const className = obj.attributes.class.slice(lastIndexOfDot + 1)
  let text = ""

  text += `\n${spaces}@${obj.name === "one-to-one" ? "One" : "Many"}ToOne(fetch = FetchType.Lazy, cascade = [ CascadeType.ALL ])`

  if (obj.attributes.column) {
    text += `\n${spaces}@JoinColumn(name = "${obj.attributes.column}", insertable = false, updatable = false)`
  }
  else {
    const elements = obj.attributes.elements || []
    for (const element of elements)
      if (element.name === "column")
        text += `\n${spaces}@JoinColumn(name = "${element.attributes.name}", insertable = false, updatable = false)`
  }

  text += `\n${spaces}@JsonBackReference`
  text += `\n${spaces}var ${obj.attributes.name.replace("Hibernate", "")}: ${className}? = null`
  
  return text
}