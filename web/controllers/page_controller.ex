defmodule SamplePhoenixReactApp.PageController do
  use SamplePhoenixReactApp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
