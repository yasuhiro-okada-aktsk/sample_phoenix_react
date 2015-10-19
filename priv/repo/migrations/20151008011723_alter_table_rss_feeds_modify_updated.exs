defmodule SamplePhoenixReactApp.Repo.Migrations.AlterTableRssFeedsModifyUpdated do
  use Ecto.Migration

  def change do
      alter table(:rss_feeds) do
        modify :updated, :datetime
      end
  end
end
