import gleam/list
import plinth/browser/document
import plinth/browser/element
import plinth/browser/window

pub fn preload() {
  window.add_event_listener("DOMContentLoaded", fn(_e) {
    list.each(["chrome", "node", "electron"], fn(t) {
      replace_text(t <> "-version", "version not available")
    })
  })

  document.set_title("Gleam Electron App")
}

fn replace_text(selector: String, text: String) {
  let element = document.get_element_by_id(selector)

  case element {
    Ok(el) -> element.set_inner_text(el, text)
    Error(_) -> Nil
  }
}
