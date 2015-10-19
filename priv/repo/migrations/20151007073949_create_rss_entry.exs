defmodule SamplePhoenixReactApp.Repo.Migrations.CreateRssEntry do
  use Ecto.Migration

  def change do
    create table(:rss_entries) do
      add :entry_id, :integer
      add :rss_feed_id, :integer
      add :title, :string
      add :subtitle, :string
      add :summary, :string
      add :link, :string
      add :author, :string
      add :duration, :integer
      add :image, :string
      add :updated, :date

      timestamps
    end

  end
end
