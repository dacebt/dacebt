export function collectDeclarations(value, declarations = {}) {
  if (!value || typeof value !== "object") return declarations

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("--chakra-") && typeof child === "string") {
      declarations[key] = child
      continue
    }
    collectDeclarations(child, declarations)
  }

  return declarations
}

export function collectStrings(value, strings = []) {
  if (typeof value === "string") {
    strings.push(value)
    return strings
  }
  if (!value || typeof value !== "object") return strings

  for (const child of Object.values(value)) collectStrings(child, strings)
  return strings
}

export function findObject(value, key) {
  if (!value || typeof value !== "object") return undefined
  if (Object.hasOwn(value, key)) return value[key]

  for (const child of Object.values(value)) {
    const found = findObject(child, key)
    if (found) return found
  }

  return undefined
}

export function requireDeclaration(errors, declarations, name) {
  if (!Object.hasOwn(declarations, name)) {
    errors.push(`missing generated declaration ${name}`)
  }
}

export function requireNestedReference(errors, declarations, name, reference) {
  const value = declarations[name] || ""
  if (!value.includes(`var(${reference})`)) {
    errors.push(`${name} does not contain nested Chakra variable ${reference}`)
  }
}

export function requireResolvedValue(errors, declarations, name, expected) {
  const value = declarations[name] || ""
  if (value !== expected) {
    errors.push(`${name} does not resolve to expected value ${expected}`)
  }
}

export function rejectFragments(errors, label, values) {
  for (const value of values) {
    const normalizedValue = value.replaceAll("\\.", ".")
    if (
      value.includes("{") ||
      value.includes("}") ||
      value.includes("colors.") ||
      value.includes("colors\\.") ||
      /\b(?:bg|border|accent|text|gradient|modal|projectCard|surface)\.[\w.-]+/.test(
        normalizedValue,
      )
    ) {
      errors.push(`${label} contains an unresolved token fragment: ${value}`)
    }
  }
}

export function hasProperty(value, key) {
  if (!value || typeof value !== "object") return false
  if (Object.hasOwn(value, key)) return true

  return Object.values(value).some((child) => hasProperty(child, key))
}

export function verifyStyle(errors, system, label, style, expectedValues = []) {
  const css = system.css(style)
  const values = collectStrings(css)
  rejectFragments(errors, label, values)

  for (const expected of expectedValues) {
    if (!values.includes(expected)) {
      errors.push(`${label} did not resolve expected CSS value ${expected}`)
    }
  }

  return { css, values }
}
