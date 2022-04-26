// @ts-check
import { parse } from "./deps/flags.js"
import { xml2js } from "./deps/xml2js.js"
import { genEntityFile } from "./tranformators/genEntityFile.js"

if (!Deno.args.length) {
  console.log("Please, set the output first.")
  Deno.exit()
}

const args = parse(Deno.args)
const pkg = args.package

if (pkg !== undefined && typeof pkg !== "string") {
  console.log("pkg needs to be a string")
  Deno.exit()
}

const output = Deno.args[Deno.args.length - 1]
const text = await Deno.readTextFile(output)
/**
 * 
 * @type {Record<string, any>}
 */
const obj = xml2js(text, {})

for (const node of obj.elements)
  if (node.type === "element")
    genEntityFile(node.elements[0], { spaces: "  ", pkg })