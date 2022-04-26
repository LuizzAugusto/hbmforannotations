export type OptionsTypes = { spaces?: string, pkg?: string }

export type ColumnTypes = "string"|"boolean"|"integer"|"double"|"long"

export type ElementTypes = HbmPropertyType|HbmIdType|HbmManyToOneType|HbmOneToOneType|HbmCompositeIdType

export type HbmPropertyAtrributesType = {
  name: string,
  type: ColumnTypes,
  column: string,
  "not-null"?: true,
}

export type HbmPropertyType = {
  name: "property",
  attributes: HbmPropertyAtrributesType,
}

export type HbmIdType = {
  name: "id",
  attributes: HbmPropertyAtrributesType,
}

export type HbmManyToOneType = {
  name: "many-to-one",
  attributes: {
    name: string,
    column: string,
    class: string,
    elements: ({ name: "column", attributes: { name: string } })[]
  },
}

export type HbmOneToOneType = {
  name: "one-to-one",
  attributes: {
    name: string,
    column: string,
    class: string,
    elements: ({ name: "column", attributes: { name: string } })[]
  },
}

export type HbmKeyTypes = HbmKeyPropertyType|HbmKeyManyToOneType

export type HbmKeyPropertyType = {
  name: "key-property",
  attributes: HbmPropertyAtrributesType,
}

export type HbmKeyManyToOneType = {
  name: "key-many-to-one",
  attributes: {
    name: string,
    column: string,
    class: string,
    elements: ({ name: "column", attributes: { name: string } })[]
  },
}

export type HbmCompositeIdType = {
  name: "composite-id",
  attributes: { name: string, class: string, },
  elements: HbmKeyTypes[]
}

export type HbmEntityType = {
  name: "class",
  attributes: { name: string, table: string, },
  elements: ElementTypes[]
}