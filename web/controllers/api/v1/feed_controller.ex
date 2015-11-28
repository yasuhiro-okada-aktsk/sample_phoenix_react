defmodule SamplePhoenixReactApp.Api.V1.FeedController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  alias SamplePhoenixReactApp.RssFeed
  alias SamplePhoenixReactApp.RssEntry
  alias SamplePhoenixReactApp.RssEntryQuery

  plug :scrub_params, "feed_url" when action in [:create]
  plug :scrub_params, "id" when action in [:update]

  def index(conn, _params) do
    feeds = RssFeed |> Repo.all |> Repo.preload [:entries]

    render(conn, "index.json", feeds: feeds)
  end

  def create(conn, %{"feed_url" => feed_url}) do
    update_feed(conn, feed_url, nil)
  end

  def show(conn, %{"id" => id}) do
    feed = Repo.get!(Feed, id)
    render(conn, "show.json", feed: feed)
  end

  def update(conn, %{"id" => id} ) do
    feed = Repo.get!(RssFeed, id)
    update_feed(conn, feed.feed_url, feed)
  end

  def delete(conn, %{"id" => id}) do
    feed = Repo.get!(Feed, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(feed)

    send_resp(conn, :no_content, "")
  end

  defp update_feed(conn, feed_url, model) do
      if !model do
        model = %RssFeed{}
      end

      feed = feed_url
      |> String.strip
      |> SamplePhoenixReactApp.RssFetcher.fetch

      params =  Map.delete(feed, :__struct__) |> Map.put(:feed_url, feed_url) |> Map.put(:feed_id, feed.id)
      if params.updated do
        params = %{ params | :updated => elem(Timex.DateFormat.parse(params.updated, "{ISO}"), 1) }
      else
        params = Map.delete(params, :updated)
      end
      changeset = RssFeed.changeset(model, params)

      if model.id do
        result = Repo.update(changeset)
      else
        result = Repo.insert(changeset)
      end

      case result do
        {:ok, rss_feed} ->
          update_entries(conn, rss_feed, feed.entries)
          conn
          |> put_status(:created)
          |> render("update.json", feed: rss_feed)
        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: changeset)
        _ ->
          conn
          |> put_status(500)
          |> json feed
      end
  end

  defp update_entries(conn, feed, [entry | tail]) do
    update_entry(conn, feed, entry)
    update_entries(conn, feed, tail)
  end

  defp update_entries(conn, feed, []) do
  end

  defp update_entry(conn, feed, entry) do
    model = Repo.one(RssEntryQuery.by_link(entry.link))
    if (!model) do
      model = %RssEntry{}
    end
    params =  Map.delete(entry, :__struct__) |> Map.put(:rss_feed_id, feed.id) #|> Map.put(:entry_id, entry.id)
    changeset = RssEntry.changeset(model, params)

    if model.id do
      result = Repo.update(changeset)
    else
      result = Repo.insert(changeset)
    end

    case result do
      {:ok, rss_entry} ->
        conn
      {:error, changeset} ->
        Logger.debug "failed: " <> IO.inspect(changeset)
      _ ->
        Logger.debug "failed: unknown"
    end
    conn
  end

end
