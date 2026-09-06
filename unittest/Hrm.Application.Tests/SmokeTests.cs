namespace Hrm.Application.Tests;

public class SmokeTests
{
  [Fact]
  public void Application_Assembly_Loads()
  {
    var asm = typeof(Hrm.Application.DependencyInjection.ApplicationLayerExtension).Assembly;
    Assert.Contains("Hrm.Application", asm.GetName().Name);
  }
}
