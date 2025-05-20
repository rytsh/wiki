# Database Connections

| Driver     | Library                        |
| ---------- | ------------------------------ |
| PostgreSQL | github.com/jackc/pgx/v5/stdlib |
| Oracle     | github.com/godror/godror       |

And database connection initialization use always connection max lifetime!  
If you don't set it, connection could be closed by the database server and you will get an error when you try to use it on first time.

```go
package database

import (
	"context"
	"fmt"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

var (
	ConnMaxLifetime = 15 * time.Minute
	MaxIdleConns    = 3
	MaxOpenConns    = 3
)

// Connect attempts to connect to database server.
func Connect(ctx context.Context, cfg *config.Config) (*sqlx.DB, error) {
	db, err := sqlx.ConnectContext(ctx, cfg.DBType, cfg.DBDataSource)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	db.SetConnMaxLifetime(ConnMaxLifetime)
	db.SetMaxIdleConns(MaxIdleConns)
	db.SetMaxOpenConns(MaxOpenConns)

	return db, nil
}
```
