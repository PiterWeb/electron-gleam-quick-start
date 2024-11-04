import gleam/io
import gleam/option.{type Option}
import utils/path

@external(javascript, "./js_wrapper/electron.js", "getBrowserWindow")
fn get_browser_window(options: BrowserWindowOptions) -> BrowserWindow

@external(javascript, "./js_wrapper/electron.js", "loadFile")
fn load_file(window: BrowserWindow, file: String) -> Nil

@external(javascript, "./js_wrapper/electron.js", "appWhenReady")
fn app_when_ready(callback: fn() -> Nil) -> Nil

@external(javascript, "./js_wrapper/electron.js", "onWindowAllClosed")
fn on_window_all_closed(callback: fn() -> Nil) -> Nil

type BrowserWindow

type BrowserWindowWebPreferences {
  BrowserWindowWebPreferences(
    accessible_title: Option(String),
    additional_arguments: Option(List(String)),
    allow_running_insecure_content: Option(Bool),
    autoplay_policy: Option(String),
    background_throttling: Option(Bool),
    context_isolation: Option(Bool),
    default_encoding: Option(String),
    default_font_family: Option(Nil),
    default_font_size: Option(Int),
    default_monospace_font_size: Option(Int),
    dev_tools: Option(Bool),
    disable_blink_features: Option(String),
    disable_dialogs: Option(Bool),
    disable_html_fullscreen_window_resize: Option(Bool),
    enable_blink_features: Option(String),
    enable_preferred_size_mode: Option(Bool),
    enable_web_sql: Option(Bool),
    experimental_features: Option(Bool),
    image_animation_policy: Option(String),
    images: Option(Bool),
    javascript: Option(Bool),
    minimum_font_size: Option(Int),
    navigate_on_drag_drop: Option(Bool),
    node_integration: Option(Bool),
    node_integration_in_sub_frames: Option(Bool),
    offscreen: Option(Bool),
    partition: Option(String),
    plugins: Option(Bool),
    preload: Option(String),
    safe_dialogs: Option(Bool),
    safe_dialogs_message: Option(String),
    sandbox: Option(Bool),
    scroll_bounce: Option(Bool),
    session: Option(Nil),
    spellcheck: Option(Bool),
    text_areas_are_resizable: Option(Bool),
    transparent: Option(Bool),
    v8_cache_options: Option(String),
    webgl: Option(Bool),
    web_security: Option(Bool),
    webview_tag: Option(Bool),
    zoom_factor: Option(Float),
  )
}

type BrowserWindowOptions {
  BrowserWindowOptions(
    width: Option(Int),
    height: Option(Int),
    title: Option(String),
    web_preferences: Option(BrowserWindowWebPreferences),
    paint_when_initially_hidden: Option(Bool),
  )
}

fn create_window() {
  let window =
    get_browser_window(BrowserWindowOptions(
      width: option.Some(1920),
      height: option.Some(1080),
      title: option.Some("Hello"),
      web_preferences: option.Some(BrowserWindowWebPreferences(
        preload: option.Some(path.to_absolute_path("./preload.js")),
        accessible_title: option.None,
        additional_arguments: option.None,
        allow_running_insecure_content: option.None,
        autoplay_policy: option.None,
        background_throttling: option.None,
        context_isolation: option.None,
        default_encoding: option.None,
        default_font_family: option.None,
        default_font_size: option.None,
        default_monospace_font_size: option.None,
        dev_tools: option.None,
        disable_blink_features: option.None,
        disable_dialogs: option.None,
        disable_html_fullscreen_window_resize: option.None,
        enable_blink_features: option.None,
        enable_preferred_size_mode: option.None,
        enable_web_sql: option.None,
        experimental_features: option.None,
        image_animation_policy: option.None,
        images: option.None,
        javascript: option.None,
        minimum_font_size: option.None,
        navigate_on_drag_drop: option.None,
        node_integration: option.None,
        node_integration_in_sub_frames: option.None,
        offscreen: option.None,
        partition: option.None,
        plugins: option.None,
        safe_dialogs: option.None,
        safe_dialogs_message: option.None,
        sandbox: option.None,
        scroll_bounce: option.None,
        session: option.None,
        spellcheck: option.None,
        text_areas_are_resizable: option.None,
        transparent: option.None,
        v8_cache_options: option.None,
        webgl: option.None,
        web_security: option.None,
        webview_tag: option.None,
        zoom_factor: option.None,
      )),
      paint_when_initially_hidden: option.None,
    ))

  load_file(window, "index.html")
}

pub fn main() {
  app_when_ready(create_window)
  on_window_all_closed(fn() { io.println("All windows closed") })

  io.println("Hello from main")
}
