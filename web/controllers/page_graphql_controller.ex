defmodule SamplePhoenixReactApp.PageGraphqlController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  plug :put_layout, "app_graphql.html"

  def index(conn, _params) do
    render conn, "index.html"
  end
end
