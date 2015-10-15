defmodule SamplePhoenixReactApp.PageController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  def index(conn, _params) do
    Logger.info "path: " <> inspect(conn.params["paths"])
    render conn, "index.html"
  end

  def static(conn, _params) do
    layout_name = hd(conn.params["paths"]) <> ".html"
    render conn, layout_name, layout: {SamplePhoenixReactApp.LayoutView, "static.html"}
  end
end
