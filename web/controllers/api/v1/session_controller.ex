defmodule SamplePhoenixReactApp.Api.V1.SessionController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  alias SamplePhoenixReactApp.UserAuth
  alias SamplePhoenixReactApp.UserQuery

  plug Guardian.Plug.EnsureAuthenticated,
    %{ on_failure: { SamplePhoenixReactApp.Api.V1.SessionController, :unauthenticated_api } } when not action in [:create]
  #plug Guardian.Plug.EnsurePermissions, on_failure: { SessionController, :forbidden_api }, default: [:write_profile]

  @doc """
    sign in
  """
  def create(conn, params = %{}) do
    user = Repo.one(UserQuery.by_email(params["user"]["email"] || ""))

    if user do
      changeset = UserAuth.login_changeset(user, params["user"])
      if changeset.valid? do
        #conn
        #|> Guardian.Plug.sign_in(user, :token, perms: %{ default: Guardian.Permissions.max })
        #|> json %{token: Guardian.Plug.current_token(conn)}
        { :ok, jwt, full_claims } = Guardian.encode_and_sign(user, :token)
        json conn, %{token: jwt}
      else
        conn
        |> put_status(:unauthorized)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: changeset)
      end
    else
        conn
        |> put_status(:unauthorized)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: nil)
    end
  end

  @doc """
    sign out
  """
  def delete(conn, _params) do
    case Guardian.revoke!(Plug.Conn.get_req_header(conn, "authorization"), :token) do
      :ok -> text conn, "sign out"
      _ -> text conn, "failed"
    end

  end

  def unauthenticated_api(conn, _params) do
    the_conn = put_status(conn, 401)
    case Guardian.Plug.claims(conn) do
      { :error, :no_session } -> json(the_conn, %{ error: "Login required" })
      { :error, reason } -> json(the_conn, %{ error: reason })
      _ -> json(the_conn, %{ error: "Login required" })
    end
  end

  def forbidden_api(conn, _) do
    conn
    |> put_status(403)
    |> json(%{ error: :forbidden })
  end
end