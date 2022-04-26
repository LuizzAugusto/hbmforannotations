// @ts-check
/**
 * 
 * @param {import("./types.d.ts").HbmCompositeIdType} obj
 * @param {{spaces?: string}|undefined} options
 */
export function genCompositeIdFile(obj, { spaces = "    " } = {}) {
  let text = ""

  if (spaces.replaceAll(" ", "") !== "") {
    throw Error("Just spaces are permitted.")
  }

  const lastIndexOfDot = obj.attributes.name.lastIndexOf(".")
  const className = obj.attributes.name.slice(lastIndexOfDot + 1)

  text += `@Embeddable`
  text += `\n@EqualsAndHashCode`
  text += `\nclass ${className} {`
  
  for (const node of obj.elements) {
    const { name, attributes } = node

    if (name === "key-property") {
      const propType  = attributes.type[0].toLocaleUpperCase() + attributes.type.slice(1)
        
      text += `${spaces}\n@Column(${attributes.column}${attributes["not-null"] ? ", nullable = false" : ""})`
      text += `${spaces}\nvar ${attributes.name}: ${propType}? = null`
    }
    else {
      console.log(name)
    }

    text += "\n"
  }

  text += "}"

  return text
}