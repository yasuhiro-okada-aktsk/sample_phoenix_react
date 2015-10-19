defmodule SamplePhoenixReactApp.Repo.Migrations.CreateRssFeed do
  use Ecto.Migration

  def change do
    create table(:rss_feeds) do
      add :feed_url, :string
      add :feed_id, :string
      add :title, :string
      add :subtitle, :string
      add :summary, :string
      add :link, :string
      add :author, :string
      add :image, :string
      add :updated, :date

      timestamps
    end

  end
end
