import gleam/io
import gleam/option.{type Option}

@external(javascript, "./js_wrapper/main.js", "getBrowserWindow")
fn get_browser_window(options: BrowserWindowOptions) -> BrowserWindow

@external(javascript, "./js_wrapper/main.js", "loadFile")
fn load_file(window: BrowserWindow, file: String) -> Nil

@external(javascript, "./js_wrapper/main.js", "appWhenReady")
fn app_when_ready(callback: fn() -> Nil) -> Nil

@external(javascript, "./js_wrapper/main.js", "onWindowAllClosed")
fn on_window_all_closed(callback: fn() -> Nil) -> Nil

type BrowserWindow {
  BrowserWindow(BrowserWindowOptions)
}

type BrowserWindowWebPreferences

type BrowserWindowOptions {
  BrowserWindowOptions(
    width: Option(Int),
    height: Option(Int),
    title: Option(String),
    web_preferences: Option(BrowserWindowWebPreferences),
  )
}

fn create_window() {
  let window =
    get_browser_window(BrowserWindowOptions(
      width: option.Some(1920),
      height: option.Some(1080),
      title: option.Some("Hello"),
      web_preferences: option.None,
    ))

  case window {
    BrowserWindow(options) -> io.debug(options)
  }

  load_file(window, "index.html")
}

pub fn main() {
  app_when_ready(create_window)
  on_window_all_closed(fn() { io.println("All windows closed") })

  io.println("Hello from main")
}
