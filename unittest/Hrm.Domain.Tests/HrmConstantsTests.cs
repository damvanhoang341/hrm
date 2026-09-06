using Hrm.Domain.Shared.Constants;

namespace Hrm.Domain.Tests;

public class HrmConstantsTests
{
  [Fact]
  public void ProductName_IsHrm()
  {
    Assert.Equal("Hrm", HrmConstants.ProductName);
  }
}
