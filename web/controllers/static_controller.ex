defmodule SamplePhoenixReactApp.StaticController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  plug :put_layout, "static.html"

  def static(conn, %{"paths" => ["about"]}) do
    render conn, "about.html"
  end

  def static(conn, %{"paths" => ["help"]} = _params) do
    Logger.info "/help : " <> inspect(_params)
    render conn, "help.html"
  end

  def static(conn, _params) do
    Logger.info "other"
    redirect conn, to: "/"
  end
end
