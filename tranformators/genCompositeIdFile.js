// @ts-check
import { writeFile } from "../utils/writeFile.js"

/**
 * 
 * @param {import("./types.d.ts").HbmCompositeIdType} obj
 * @param {import("./types.d.ts").OptionsTypes|undefined} options
 */
export function genCompositeIdFile(obj, { spaces = "    ", pkg = undefined } = {}) {
  let text = ""

  if (spaces.replaceAll(" ", "") !== "") {
    throw Error("Just spaces are permitted.")
  }

  const lastIndexOfDot = obj.attributes.class.lastIndexOf(".")
  const className = obj.attributes.class.slice(lastIndexOfDot + 1)

  if (pkg) {
    text += `package ${pkg}\n\n`
  }

  text += `import lombok.EqualsAndHashCode\n\n`
  text += `import javax.persistence.*\n\n`

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

  writeFile(className, text)
}