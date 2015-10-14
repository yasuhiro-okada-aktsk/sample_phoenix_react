defmodule SamplePhoenixReactApp.PageController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  def index(conn, _params) do
    Logger.info "path: " <> inspect(conn.params["path"])
    render conn, "index.html"
  end
end
