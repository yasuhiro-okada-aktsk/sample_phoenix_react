defmodule SamplePhoenixReactApp.Router do
  use SamplePhoenixReactApp.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api/v1", SamplePhoenixReactApp.Api.V1 do
    pipe_through [:api]

    post "/login", SessionController, :create, as: :login
    delete "/logout", SessionController, :delete, as: :logout

    resources "/users", UserController
    resources "/feeds", FeedController
  end

  scope "/graphql", SamplePhoenixReactApp.Graphql do
    pipe_through [:api]

    get "/", GraphqlController, :query
    post "/", GraphqlController, :query
  end

  scope "/", SamplePhoenixReactApp do
    pipe_through :browser # Use the default browser stack

    get "/static/*paths", StaticController, :static
    get "/*paths", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", SamplePhoenixReactApp do
  #   pipe_through :api
  # end
end
