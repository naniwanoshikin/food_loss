# プッシュ
p:
	git add -A
	git commit -m "add_reademe"
	git push

# 特定の相対パス, 特定の拡張子のファイルを削除
filed:
	find src/app/views -type f -name "*.slim" -delete

# -----------------------------------------------
# コンフリクト解消 失敗するかも
pull:
	git pull origin master
	git co master
# rm -fr ".git/rebase-merge"
	git pull origin master
	git co tweets
	git merge mas

# -----------------------------------------------
# 直前のコミットに戻る
co:
	git checkout HEAD -- .
# 特定のコミットに戻る
coi:
	git reset --hard 3c9de2f70444ab0de565c5ade8aaa4350f5c1ddd
# 特定のコミットに戻る 特定のファイルのみ
cof:
	git checkout 73751191ee5467c93804cd438f1a7f6fbbdcae82 src/app/assets/stylesheets

# -----------------------------------------------
# ブランチ確認
b:
	git branch
# ブランチ作成
bm:
	git switch -c main

