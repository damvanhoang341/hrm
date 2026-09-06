using Hrm.Domain.DependencyInjection;
using Hrm.Domain.Repositories;
using Hrm.Infrastructure.Persistence;
using Jarvis.BlobStoring.Extensions;
using Jarvis.Caching.Extensions;
using Jarvis.ORM.EntityFramework;
using Jarvis.ORM.EntityFramework.DataStorages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Hrm.Infrastructure.DependencyInjection;

public static class InfrastructureLayerExtension
{
  public static IHostApplicationBuilder AddInfrastructureLayer(this IHostApplicationBuilder builder)
  {
    builder.AddDomainLayer();
    builder.AddJarvisCaching();
    builder.AddCoreBlobStoring();
    builder.AddEntityFramework();

    builder.Services.AddScoped<IAppUnitOfWork, AppUnitOfWork>();

    builder.Services.AddCoreDbContext<AppDbContext>(options =>
      options.UseNpgsql(builder.Configuration.GetConnectionString("AppDbContext")
        ?? "Host=localhost;Port=5432;Database=hrm;Username=admin;Password=Admin@123"));

    return builder;
  }
}
