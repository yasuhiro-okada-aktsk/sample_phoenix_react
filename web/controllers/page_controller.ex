defmodule SamplePhoenixReactApp.PageController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  def index(conn, _params) do
    Logger.info "path: " <> inspect(conn.params["path"])
    render conn, "index.html"
  end

  def static(conn, _params) do
    layout_name = hd(conn.params["path"]) <> ".html"
    render conn, layout_name, layout: {SamplePhoenixReactApp.LayoutView, "static.html"}
  end
end
