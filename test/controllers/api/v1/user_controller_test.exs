defmodule SamplePhoenixReactApp.Api.V1.UserControllerTest do
  use SamplePhoenixReactApp.ConnCase

  alias SamplePhoenixReactApp.UserAuth
  @valid_attrs %{email: "some content", password: "some content", name: "some content"}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

#  test "lists all entries on index", %{conn: conn} do
#    conn = get conn, user_path(conn, :index)
#    assert json_response(conn, 200) == []
#  end

#  test "shows chosen resource", %{conn: conn} do
#    user_auth = Repo.insert! %UserAuth{}
#    conn = get conn, user_path(conn, :show, user_auth)
#    assert json_response(conn, 200) == %{"id" => user_auth.id, "name" => user_auth.name}
#  end

#  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
#    assert_raise Ecto.NoResultsError, fn ->
#      get conn, user_path(conn, :show, -1)
#    end
#  end

#  test "creates and renders resource when data is valid", %{conn: conn} do
#    conn = post conn, user_path(conn, :create), user: @valid_attrs
#    assert json_response(conn, 201)["id"]
#    assert Repo.get_by(UserAuth, Map.delete(@valid_attrs, :password))
#  end
#
#  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
#    conn = post conn, user_path(conn, :create), user: @invalid_attrs
#    assert json_response(conn, 422)["errors"] != %{}
#  end

#  test "updates and renders chosen resource when data is valid", %{conn: conn} do
#    user_auth = Repo.insert! %UserAuth{}
#    conn = put conn, user_path(conn, :update, user_auth), user: @valid_attrs
#    assert json_response(conn, 200)["id"]
#    assert Repo.get_by(UserAuth, Map.delete(@valid_attrs, :password))
#  end

#  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
#    user_auth = Repo.insert! %UserAuth{}
#    conn = put conn, user_path(conn, :update, user_auth), user: @invalid_attrs
#    assert json_response(conn, 422)["errors"] != %{}
#  end

#  test "deletes chosen resource", %{conn: conn} do
#    user_auth = Repo.insert! %UserAuth{}
#    conn = delete conn, user_path(conn, :delete, user_auth)
#    assert response(conn, 204)
#    refute Repo.get(UserAuth, user_auth.id)
#  end
end
