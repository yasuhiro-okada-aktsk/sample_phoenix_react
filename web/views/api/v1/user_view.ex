defmodule SamplePhoenixReactApp.Api.V1.UserView do
  use SamplePhoenixReactApp.Web, :view

  alias SamplePhoenixReactApp.Api.V1.UserView

  require Logger

  def render("index.json", %{user_auths: user_auths}) do
    render_many(user_auths, UserView, "user.json")
  end

  def render("show.json", %{user_auth: user_auth}) do
    render_one(user_auth, UserView, "user.json")
  end

  def render("user.json", %{user: user_auth}) do
    %{id: user_auth.id,
      name: user_auth.name}
  end
end
