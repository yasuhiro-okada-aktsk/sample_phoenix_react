defmodule SamplePhoenixReactApp.UserQuery do
  import Ecto.Query
  alias SamplePhoenixReactApp.UserAuth

  def by_email(email) do
    from u in UserAuth, where: u.email == ^email
  end
end
