defmodule SamplePhoenixReactApp.Repo.Migrations.AlterTableRssEntriesSummary do
  use Ecto.Migration

  def change do
    alter table(:rss_feeds) do
      modify :summary, :text
    end

    alter table(:rss_entries) do
      modify :summary, :text
    end
  end
end
