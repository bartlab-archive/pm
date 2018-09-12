<?php

namespace App\Services;

use App\Models\Wiki;
use App\Models\WikiContent;
use App\Models\WikiContentVersion;
use App\Models\WikiPage;

class WikisService
{

    const MODULE_NAME = 'wiki';

    public function allPages($wikiId)
    {
        return WikiPage::query()
            ->with([
//                'childs',
                'content.author'
            ])
            ->where(['wiki_id' => $wikiId])
//            ->where(['parent_id' => null])
            ->get()
            ->map(function ($page) {
                $current = $page;
                $parents_ids = [];

                while ($current->parent) {
                    $parents_ids[] = $current->parent->id;
                    $current = $current->parent;
                }

                $page->parents_ids = $parents_ids;

                return $page;
            });
    }

    public function onePageById($id)
    {
        return WikiPage::query()
            ->with([
                'watchers',
                'content.author'
            ])
            ->where(['id' => $id])
            ->first();
    }

    public function onePageByName($wikiId, $name, $orNew = false)
    {
        return WikiPage::query()
                ->with([
                    'watchers',
                    'content.author'
                ])
                ->where(['title' => $name, 'wiki_id' => $wikiId])
                ->first() ?? ($orNew ? WikiPage::make(['title' => $name]) : null);
    }

    public function oneWikiById($id, array $with = [], $orNew = false)
    {
        return Wiki::query()
                ->with($with)
                ->where(['id' => $id])
                ->first() ?? ($orNew ? Wiki::make() : null);
    }

    public function oneWikiByProjectId($projectId, array $with = [], $orNew = false)
    {
        return Wiki::query()
                ->with($with)
                ->where(['project_id' => $projectId])
                ->first() ?? ($orNew ? Wiki::make() : null);
    }

    public function createWiki($projectId, array $data)
    {
        if (!$wiki = $this->oneWikiByProjectId($projectId)) {
            $wiki = Wiki::make(array_merge(
                ['project_id' => $projectId],
                array_only($data, ['start_page'])
            ));

            if (!$wiki->save()) {
                return false;
            }
        }

        return $wiki;
    }

    public function updateWiki($projectId, array $data, array $with = [])
    {
        if (($wiki = $this->oneWikiByProjectId($projectId, $with)) && $wiki->update(array_only($data, ['start_page']))) {
            return $wiki;
        }

        return false;
    }

    public function createPage($wikiId, array $data)
    {
        if ($wiki = $this->oneWikiById($wikiId)) {

            /** @var $page WikiPage */
            $page = $wiki->pages()->make(array_only($data, ['title', 'parent_id']));

            if (!$page->save()) {
                return false;
            }

            /** @var $content WikiContent */
            $content = $page->content()->make(array_only($data, ['author_id', 'text', 'comments']));

            if (!$content->save()) {
                return false;
            }

            if (!$content->versions()->make(
                array_merge(
                    array_only($data, ['author_id', 'comments']),
                    ['version' => $content->version, 'data' => $content->text, 'page_id' => $page->id]
                )
            )->save()) {
                return false;
            }

            return $page;
        }

        return false;
    }

    public function updatePage($id, array $data)
    {
        /** @var $page WikiPage */
        if (!$page = $this->onePageById($id)) {
            return false;
        }

        if (!$page->update(array_only($data, ['parent_id']))) {
            return false;
        }

        /** @var $content WikiContent */
        if (!$content = $page->content) {
            $content = $page->content()->make();
        } else {
            $content->version++;
        }

        // save only if text changed
        if ($content->text !== array_get($data, 'text')) {
            if (!$content->fill(array_only($data, ['text', 'comments']))->save()) {
                return false;
            }

            if (!$content->versions()->make(
                array_merge(
                    array_only($data, ['author_id', 'comments']),
                    ['version' => $content->version, 'data' => $content->text, 'page_id' => $page->id]
                )
            )->save()) {
                return false;
            }
        }

        return $page;
    }

    public function watchPage($id, $userId)
    {
        /** @var $page WikiPage */
        if ($page = $this->onePageById($id)) {
            $page->watchers()->attach($userId);

            return true;
        }

        return false;
    }

    public function unwatchPage($id, $userId)
    {
        /** @var $page WikiPage */
        if ($page = $this->onePageById($id)) {
            $page->watchers()->detach($userId);

            return true;
        }

        return false;
    }

    public function lockPage($id)
    {
        /** @var $page WikiPage */
        if ($page = $this->onePageById($id)) {
            return $page->update(['protected' => true]);
        }

        return false;
    }

    public function unlockPage($id)
    {
        /** @var $page WikiPage */
        if ($page = $this->onePageById($id)) {
            return $page->update(['protected' => false]);
        }

        return false;
    }

    public function deletePage($id)
    {
        /** @var $page WikiPage */
        if ($page = $this->onePageById($id)) {
            $page->watchers()->detach();
            $page->childs()->update(['parent_id' => null]);

            // todo: delete redirects?

            return $page->delete();
        }

        return false;
    }
}