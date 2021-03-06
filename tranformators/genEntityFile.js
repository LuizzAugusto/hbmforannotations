// @ts-check
import { genCompositeIdFile } from "./genCompositeIdFile.js"
import { genManyToOne } from "./genManyToOne.js"
import { writeFile } from "../utils/writeFile.js"
/**
 * 
 * @param {import("./types.d.ts").HbmEntityType} obj
 * @param {import("./types.d.ts").OptionsTypes|undefined} options
 */
export function genEntityFile(obj, options = {}) {
  const { spaces = "    ", pkg = undefined } = options
  let text = ""

  if (spaces.replaceAll(" ", "") !== "") {
    throw Error("Just spaces are permitted.")
  }

  const lastIndexOfDot = obj.attributes.name.lastIndexOf(".")
  const className = obj.attributes.name.slice(lastIndexOfDot + 1)

  if (pkg) {
    text += `package ${pkg}\n\n`
  }
  
  text += `import javax.persistence.*\n\n`

  text += `@Entity(name = ${className})`
  text += `\n@Table(name = ${obj.attributes.table})`
  text += `\nclass ${className} {`
  
  for (const node of obj.elements) {
    const { name, attributes } = node

    if (name === "id") {
      const propType  = attributes.type[0].toLocaleUpperCase() + attributes.type.slice(1)
        
      text += `\n${spaces}@Id`
      text += `\n${spaces}@Column(name = "${attributes.column}"${attributes["not-null"] ? ", nullable = false" : ""})`
      text += `\n${spaces}var ${attributes.name}: ${propType}? = null`
    }
    else if (name === "property") {
      const propType  = attributes.type[0].toLocaleUpperCase() + attributes.type.slice(1)
      
      text += `\n${spaces}@Column(name = "${attributes.column}"${attributes["not-null"] ? ", nullable = false" : ""})`
      text += `\n${spaces}var ${attributes.name}: ${propType}? = null`
    }
    else if (name === "composite-id") {
    const lastIndexOfDot = attributes.class.lastIndexOf(".")
    const className = attributes.class.slice(lastIndexOfDot + 1)
      genCompositeIdFile(node, options)
      text += `\n${spaces}@EmbeddedId`
      text += `\n${spaces}var ${attributes.name}: ${className}? = null`
    }
    else if (name === "many-to-one") {
      text += genManyToOne(node, options)
    }
    else if (name === "one-to-one") {
      text += genManyToOne(node, options)
    }

    text += "\n"
  }

  text += "}"

  writeFile(className, text)
}