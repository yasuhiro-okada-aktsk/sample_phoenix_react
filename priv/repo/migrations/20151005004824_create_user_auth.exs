defmodule SamplePhoenixReactApp.Repo.Migrations.CreateUserAuth do
  use Ecto.Migration

  def change do
    create table(:user_auths) do
      add :name, :string
      add :email, :string
      add :encrypted_password, :string

      timestamps
    end

  end
end
