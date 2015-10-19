defmodule SamplePhoenixReactApp.RssFeedTest do
  use SamplePhoenixReactApp.ModelCase

  alias SamplePhoenixReactApp.RssFeed

  @valid_attrs %{feed_url: "some content"}
  @invalid_attrs %{}

#  test "changeset with valid attributes" do
#    changeset = RssFeed.changeset(%RssFeed{}, @valid_attrs)
#    assert changeset.valid?
#  end

  test "changeset with invalid attributes" do
    changeset = RssFeed.changeset(%RssFeed{}, @invalid_attrs)
    refute changeset.valid?
  end
end
