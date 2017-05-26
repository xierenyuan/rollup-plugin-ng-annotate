import ngAnnotate from 'ng-annotate'
export default function Parse(code) {
  let source = code
  try {
    const { src, map } = ngAnnotate(code, { add: true })
    if (src) {
       source = src
    }
  } catch (error) {
    console.error(error)
  }
  return source
}
