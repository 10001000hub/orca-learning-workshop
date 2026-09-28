# tests/fixtures

`invalid-curriculum/` は、`scripts/validate-curriculum.ps1` が壊れた教材を正しく不合格（終了コード1）にすることを確かめるための意図的に不正なデータ。教材として読み込まれることはない。

含めている不正: `references.md` が無い、`learning_objective` が無い、`os` にWindows以外がある、クイズの正答が選択肢に無い、Workshopの `success_check` が空。
