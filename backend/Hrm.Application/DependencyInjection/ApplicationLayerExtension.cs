using Jarvis.DDD.Application;
using Microsoft.Extensions.Hosting;

namespace Hrm.Application.DependencyInjection;

public static class ApplicationLayerExtension
{
  public static IHostApplicationBuilder AddApplicationLayer(this IHostApplicationBuilder builder)
  {
    builder.AddCoreApplication();
    return builder;
  }
}
