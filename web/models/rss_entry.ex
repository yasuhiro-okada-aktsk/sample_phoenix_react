defmodule SamplePhoenixReactApp.RssEntry do
  use SamplePhoenixReactApp.Web, :model

  schema "rss_entries" do
    #field :entry_id, :string
    field :title, :string
    field :subtitle, :string
    field :summary, :string
    field :link, :string
    field :author, :string
    field :duration, :integer
    field :image, :string

    belongs_to :rss_feed, SamplePhoenixReactApp.RssFeed

    timestamps
  end

  @required_fields ~w(link rss_feed_id)
  @optional_fields ~w(title subtitle summary author duration image)

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
