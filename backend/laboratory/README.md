# Legacy Writer laboratory boundary

This package is a compatibility boundary for older Writer laboratory imports. It is not the canonical computation service.

New computation belongs to Mathematics-Frontend and is transferred as a versioned Scientific Object. Writer may resolve an object reference or a pinned revision, but it must not read another app's database or add solver implementations here.

Retirement criteria:

1. Existing Writer laboratory import consumers have a Scientific Object equivalent.
2. Writer papers store object references and derived publication projections separately.
3. The Math/Project path has contract, revision, and export/import coverage.
4. A migration has moved any required legacy records before this package is removed.
