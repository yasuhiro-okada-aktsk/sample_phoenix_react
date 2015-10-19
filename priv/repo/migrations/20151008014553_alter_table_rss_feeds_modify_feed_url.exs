defmodule SamplePhoenixReactApp.Repo.Migrations.AlterTableRssFeedsModifyFeedUrl do
  use Ecto.Migration

  def change do
    alter table(:rss_feeds) do
      modify :feed_url, :string, null: false
    end

    create unique_index :rss_feeds, [:feed_url]
  end
end
