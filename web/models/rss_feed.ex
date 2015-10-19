defmodule SamplePhoenixReactApp.RssFeed do
  use SamplePhoenixReactApp.Web, :model

  require Logger

  schema "rss_feeds" do
    field :feed_url, :string
    field :feed_id, :string
    field :title, :string
    field :subtitle, :string
    field :summary, :string
    field :link, :string
    field :author, :string
    field :image, :string
    field :updated, Timex.Ecto.DateTime

    has_many :entries, SamplePhoenixReactApp.RssEntry

    timestamps
  end

  @required_fields ~w(feed_url)
  @optional_fields ~w()

  def changeset(model, params) do
    model
    |> cast(params, ~w(feed_url title), ~w(feed_id subtitle summary link author image updated))
    |> unique_constraint(:feed_url)
  end
end
