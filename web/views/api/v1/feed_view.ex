defmodule SamplePhoenixReactApp.Api.V1.FeedView do
  use SamplePhoenixReactApp.Web, :view

  alias SamplePhoenixReactApp.Api.V1.FeedView
  alias SamplePhoenixReactApp.Api.V1.EntryView

  def render("index.json", %{feeds: feeds}) do
    render_many(feeds, FeedView, "feed_full.json")
  end

  def render("show.json", %{feed: feed}) do
    render_one(feed, FeedView, "feed_full.json")
  end

  def render("update.json", %{feed: feed}) do
    render_one(feed, FeedView, "feed_compact.json")
  end

  def render("feed_compact.json", %{feed: feed}) do
    %{id: feed.id,
      feed_url: feed.feed_url,
      feed_id: feed.feed_id,
      title: feed.title,
      subtitle: feed.subtitle,
      summary: feed.summary,
      link: feed.link,
      image: feed.image
      }
  end

  def render("feed_full.json", %{feed: feed}) do
    %{id: feed.id,
      feed_url: feed.feed_url,
      feed_id: feed.feed_id,
      title: feed.title,
      subtitle: feed.subtitle,
      summary: feed.summary,
      link: feed.link,
      image: feed.image,
      entries: render_many(feed.entries, EntryView, "entry.json")
      }
  end
end
