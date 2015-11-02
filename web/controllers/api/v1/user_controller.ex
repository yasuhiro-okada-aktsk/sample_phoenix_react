defmodule SamplePhoenixReactApp.Api.V1.UserController do
  use SamplePhoenixReactApp.Web, :controller

  alias SamplePhoenixReactApp.UserAuth
  alias SamplePhoenixReactApp.UserQuery

  plug Guardian.Plug.EnsureAuthenticated,
      %{ on_failure: { SamplePhoenixReactApp.Api.V1.SessionController, :unauthenticated_api } } when action in [:index]

  plug :scrub_params, "user" when action in [:create, :update]

  def index(conn, _params) do
    user_auths = Repo.all(UserAuth)
    render(conn, "index.json", user_auths: user_auths)
  end

  def create(conn, %{"user" => user_auth_params}) do
    changeset = UserAuth.create_changeset(%UserAuth{}, user_auth_params)

    case Repo.insert(changeset) do
      {:ok, user_auth} ->
        user = Repo.one(UserQuery.by_email(user_auth_params["email"] || ""))
        { :ok, jwt, full_claims } = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(:created)
        |> json %{token: jwt}
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user_auth = Repo.get!(UserAuth, id)
    render(conn, "show.json", user_auth: user_auth)
  end

  def update(conn, %{"id" => id, "user" => user_auth_params}) do
    user_auth = Repo.get!(UserAuth, id)
    changeset = UserAuth.update_changeset(user_auth, user_auth_params)

    case Repo.update(changeset) do
      {:ok, user_auth} ->
        render(conn, "show.json", user_auth: user_auth)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user_auth = Repo.get!(UserAuth, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user_auth)

    send_resp(conn, :no_content, "")
  end
end
