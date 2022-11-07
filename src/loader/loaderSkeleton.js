import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./loaderSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";

export function ListLoaderSkeleton() {
  return (
    <div className="list-loader-skeleton">
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#bababa">
        <div className="loader-skeleton-items">
          <Skeleton height={20} count={0.7} />
          <Skeleton height={300} count={1} />
          <Skeleton height={23} count={1} />
          <Skeleton height={20} count={0.4} />
          <Skeleton height={20} count={0.7} />
          <Skeleton height={20} count={0.7} />
        </div>
        <div className="loader-skeleton-items">
          <Skeleton height={20} count={0.7} />
          <Skeleton height={300} count={1} />
          <Skeleton height={23} count={1} />
          <Skeleton height={20} count={0.4} />
          <Skeleton height={20} count={0.7} />
          <Skeleton height={20} count={0.7} />
        </div>
      </SkeletonTheme>
    </div>
  );
}

export function DetailsLoaderSkeleton() {
  return (
    <div className="details-loader-skeleton">
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#bababa">
        <div className="loader-skeleton-items">
          <Skeleton height={20} count={0.5} />
          <Skeleton height={240} count={1} />
          <Skeleton height={27} count={0.8} />
          <Skeleton height={20} count={0.4} />
          <Skeleton height={20} count={0.7} />
          <Skeleton height={20} count={0.7} />
        </div>
        <div className="loader-skeleton-items">
          <Skeleton height={20} count={0.7} />
          <Skeleton height={20} count={0.7} />
          <Skeleton height={150} count={1} />
        </div>
      </SkeletonTheme>
    </div>
  );
}
