defmodule SamplePhoenixReactApp.Api.V1.RssFeedControllerTest do
  use SamplePhoenixReactApp.ConnCase

  alias SamplePhoenixReactApp.RssFeed
  @valid_attrs %{}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, feed_path(conn, :index)
    assert json_response(conn, 200) == []
  end

#  test "shows chosen resource", %{conn: conn} do
#    feed = Repo.insert! %RssFeed{:feed_url => "http://example.com"}
#    conn = get conn, feed_path(conn, :show, feed)
#    assert json_response(conn, 200)["data"] == %{"id" => feed.id}
#  end

#  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
#    assert_raise Ecto.NoResultsError, fn ->
#      get conn, feed_path(conn, :show, -1)
#    end
#  end

#  test "creates and renders resource when data is valid", %{conn: conn} do
#    conn = post conn, feed_path(conn, :create), feed: %{"feed_url" => "http://example.com"}
#    assert json_response(conn, 201)["data"]["id"]
#    assert Repo.get_by(RssFeed, @valid_attrs)
#  end

#  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
#    conn = post conn, feed_path(conn, :create), feed: @valid_attrs
#    assert json_response(conn, 422)["errors"] != %{}
#  end

#  test "updates and renders chosen resource when data is valid", %{conn: conn} do
#    feed = Repo.insert! %RssFeed{}
#    conn = put conn, feed_path(conn, :update, feed), feed: @valid_attrs
#    assert json_response(conn, 200)["data"]["id"]
#    assert Repo.get_by(RssFeed, @valid_attrs)
#  end

#  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
#    feed = Repo.insert! %RssFeed{}
#    conn = put conn, feed_path(conn, :update, feed), feed: @invalid_attrs
#    assert json_response(conn, 422)["errors"] != %{}
#  end

#  test "deletes chosen resource", %{conn: conn} do
#    feed = Repo.insert! %RssFeed{}
#    conn = delete conn, feed_path(conn, :delete, feed)
#    assert response(conn, 204)
#    refute Repo.get(RssFeed, feed.id)
#  end
end
