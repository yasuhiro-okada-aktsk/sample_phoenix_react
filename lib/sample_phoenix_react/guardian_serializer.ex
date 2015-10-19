defmodule SamplePhoenixReactApp.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias SamplePhoenixReactApp.Repo
  alias SamplePhoenixReactApp.UserAuth

  def for_token(user = %UserAuth{}), do: { :ok, "UserAuth:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("UserAuth:" <> id), do: { :ok, Repo.get(UserAuth, id) }
  def from_token(_), do: { :error, "Unknown resource type" }
end
