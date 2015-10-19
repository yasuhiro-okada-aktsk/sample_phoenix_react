defmodule SamplePhoenixReactApp.Repo.Migrations.AlterTableRssFeedsModifyUpdated do
  use Ecto.Migration

  def change do
    alter table(:rss_entries) do
      modify :updated, :datetime
    end
  end
end
